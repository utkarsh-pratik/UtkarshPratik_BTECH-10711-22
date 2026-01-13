// frontend/src/hooks/useAnimatedModal.ts
import { useState, useEffect } from "react";

export function useAnimatedModal(isOpen: boolean, onClose: () => void) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      // When closing, wait for the animation to finish before un-rendering
      const timer = setTimeout(() => setIsRendered(false), 200); // Duration should match the transition
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    // Start the closing animation by setting isOpen to false
    onClose();
  };

  return { isRendered, handleClose };
}