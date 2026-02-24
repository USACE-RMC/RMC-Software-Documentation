import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'rmc-site-tour-completed';

const TourContext = createContext({
  isTourActive: false,
  currentStep: 0,
  totalSteps: 0,
  startTour: () => {},
  endTour: () => {},
  nextStep: () => {},
  prevStep: () => {},
  goToStep: () => {},
  hasCompletedTour: false,
});

export function TourProvider({ children }) {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [hasCompletedTour, setHasCompletedTour] = useState(false);

  // Refs for analytics — avoids adding state to useCallback deps
  const currentStepRef = useRef(0);
  const totalStepsRef = useRef(0);
  useEffect(() => { currentStepRef.current = currentStep; }, [currentStep]);
  useEffect(() => { totalStepsRef.current = totalSteps; }, [totalSteps]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasCompletedTour(localStorage.getItem(STORAGE_KEY) === 'true');
    }
  }, []);

  const lockScroll = useCallback(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflowY = 'scroll';
  }, []);

  const unlockScroll = useCallback(() => {
    document.documentElement.style.overflow = '';
    document.body.style.overflowY = '';
  }, []);

  const startTour = useCallback((stepCount) => {
    setCurrentStep(0);
    if (stepCount) setTotalSteps(stepCount);
    setIsTourActive(true);
    lockScroll();
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'tour_start');
    }
  }, [lockScroll]);

  const endTour = useCallback((markComplete = true) => {
    setIsTourActive(false);
    setCurrentStep(0);
    unlockScroll();
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      if (markComplete) {
        window.gtag('event', 'tour_complete', { steps_completed: totalStepsRef.current });
      } else {
        window.gtag('event', 'tour_exit', { exit_step: currentStepRef.current });
      }
    }
    if (markComplete && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
      setHasCompletedTour(true);
    }
  }, [unlockScroll]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step) => {
    setCurrentStep(step);
  }, []);

  const value = useMemo(
    () => ({
      isTourActive,
      currentStep,
      totalSteps,
      startTour,
      endTour,
      nextStep,
      prevStep,
      goToStep,
      hasCompletedTour,
    }),
    [isTourActive, currentStep, totalSteps, startTour, endTour, nextStep, prevStep, goToStep, hasCompletedTour],
  );

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}

export function useTour() {
  return useContext(TourContext);
}
