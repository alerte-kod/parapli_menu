import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy } from 'lucide-react';
import Button from './ui/Button';

interface MenuQRCodeProps {
  value: string;
  size?: number;
  title?: string;
}

const MenuQRCode: React.FC<MenuQRCodeProps> = ({
  value,
  size = 200,
  title = 'Menu QR Code',
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'menu-qr-code.png';
    link.href = url;
    link.click();
  };
  
  return (
    <div className="flex flex-col items-center p-6 border-2 border-secondary/20 rounded-xl bg-white shadow-lg hover:border-secondary transition-colors">
      <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <QRCodeSVG 
          id="qr-code-canvas"
          value={value}
          size={size}
          level="H"
          includeMargin
          bgColor="#FFFFFF"
          fgColor="#FF6B35"
        />
      </div>
      
      <div className="text-sm text-gray-600 mt-4 mb-6 text-center">
        <p className="font-medium">Scan to view the menu</p>
        <p className="text-xs mt-1 text-gray-500">{value}</p>
      </div>
      
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
        >
          <Copy size={16} className="mr-1" />
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
        
        <Button
          variant="primary"
          size="sm"
          onClick={handleDownload}
        >
          <Download size={16} className="mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default MenuQRCode;