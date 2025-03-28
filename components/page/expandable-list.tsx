'use client'

import { type FC, type ComponentProps, useMemo, useState, useCallback } from "react";
import { getStepColors } from "@/lib/get-step-colors";
import { easings } from "@/lib/easings";

import { AnimatePresence, motion } from "motion/react";

type ExpandableListProps = ComponentProps<"div"> & {
  title: string;
  color: string;
  items: string;
};

export const ExpandableList: FC<ExpandableListProps> = ({ title, color, items }) => {
  const [expanded, setExpanded] = useState(false)
  
  const colors = useMemo(() => {
    return getStepColors(color)
  }, [color])

  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded)
  }, [expanded, setExpanded])

  const sortedItems = useMemo(() => {
    if (!items) return [];
    return items.split("\n").sort((a, b) => a.localeCompare(b));
  }, [items]);

  const columnItems = useMemo(() => {
    const result = [[], [], []];
    const itemCount = sortedItems.length;
    const itemsPerColumn = Math.ceil(itemCount / 3);
    
    sortedItems.forEach((item, index) => {
      const columnIndex = Math.floor(index / itemsPerColumn);
      result[columnIndex].push(item);
    });
    
    return result;
  }, [sortedItems]);

  return (
    <div className="w-full flex flex-col mt-60">
      <div
        className="flex items-center gap-x-8"
        style={{
          color: colors?.[200]
        } as React.CSSProperties}
      >
        <h3 className={`max-md:hidden text-36`}>
          {title}
        </h3>

        <button
          className={`md:hidden flex items-center gap-x-2 transition-colors duration-300 ease text-current text-32`}
          onClick={toggleExpanded}
        >
          <span>{title}</span>
          <div className="h-16 w-32 relative grid-contain place-items-center">
            <motion.div
              className="w-16 h-2 bg-current will-change-transform"
              initial={{ x: 0 }}
              animate={{ x: expanded ? 16 : 0 }}
              transition={{ duration: 0.55, ease: easings.outExpo }}
            />
            <motion.div
              className="w-16 h-2 bg-current will-change-transform"
              initial={{ rotate: 90 }}
              animate={{ rotate: expanded ? 0 : 90 }}
              transition={{ duration: 0.55, ease: easings.outExpo }}
            />
          </div>
        </button>
      </div>
      <motion.div 
        className="relative overflow-hidden [--height-from:0px] md:[--height-from:auto]"
        initial={{ height: 'var(--height-from)' }}
        animate={{ height: expanded ? 'auto' : 'var(--height-from)' }}
        transition={{ duration: 0.55, ease: easings.outExpo }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-15 pt-20">
          {columnItems.map((column, columnIndex) => (
            <div key={`column-${columnIndex}`} className="flex flex-col gap-y-10">
              {column.map((item, index) => (
                <div key={`${columnIndex}-${index}`} className="text-14 font-mono">
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};