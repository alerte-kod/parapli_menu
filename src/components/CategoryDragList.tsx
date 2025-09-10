import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit, Trash2 } from 'lucide-react';
import Button from './ui/Button';
import type { Category } from '../types';

interface SortableCategoryItemProps {
  category: Category;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SortableCategoryItem: React.FC<SortableCategoryItemProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border-2 rounded-lg p-4 flex items-center gap-3 ${
        isDragging ? 'border-primary shadow-lg' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 p-1"
      >
        <GripVertical size={20} />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-gray-900">{category.name}</h3>
        <p className="text-sm text-gray-500">Order: {(category.order_index ?? 0) + 1}</p>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(category.id)}
        >
          <Edit size={16} />
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(category.id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

interface CategoryDragListProps {
  categories: Category[];
  onReorder: (newOrder: Category[]) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CategoryDragList: React.FC<CategoryDragListProps> = ({
  categories,
  onReorder,
  onEdit,
  onDelete,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);

      const newOrder = arrayMove(categories, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No categories found. Add your first category!
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={categories.map(cat => cat.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {categories.map((category) => (
            <SortableCategoryItem
              key={category.id}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default CategoryDragList;