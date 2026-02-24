import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasCompletedTour(localStorage.getItem(STORAGE_KEY) === 'true');
    }
  }, []);

  const startTour = useCallback((stepCount) => {
    setCurrentStep(0);
    if (stepCount) setTotalSteps(stepCount);
    setIsTourActive(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const endTour = useCallback((markComplete = true) => {
    setIsTourActive(false);
    setCurrentStep(0);
    document.body.style.overflow = '';
    if (markComplete && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
      setHasCompletedTour(true);
    }
  }, []);

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
