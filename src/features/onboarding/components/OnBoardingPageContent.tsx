import { useState } from "react";
import type { OnBoardingPageContentProps } from "../types";
import { useOnboardingFlow } from "../hooks/useOnboardingFlow";
import { OnBoardingLayout } from "./OnBoardingLayout";
import { OnBoardingSkipDialog } from "./OnBoardingSkipDialog";
import { OnBoardingBasicInfoStep } from "./steps/OnBoardingBasicInfoStep";
import { OnBoardingLifestyleStep } from "./steps/OnBoardingLifestyleStep";
import { OnBoardingPriorityStep } from "./steps/OnBoardingPriorityStep";
import { OnBoardingSchoolInfoStep } from "./steps/OnBoardingSchoolInfoStep";

function OnBoardingPageContent({
  initialValues,
  onBack,
  onNext,
  progressStates,
  userName = "OO",
}: OnBoardingPageContentProps) {
  const [skipDialogOpen, setSkipDialogOpen] = useState(false);
  const {
    currentStep,
    currentStepMeta,
    formValues,
    handleBack,
    handleChangeBasicInfoField,
    handleChangeSchoolInfoField,
    handleSelectDormitory,
    handleSelectGender,
    handleSelectLifestyleSingle,
    handleSelectSemesterType,
    handleSkipCurrentStep,
    handleSubmit,
    handleToggleLifestyleMulti,
    handleTogglePriorityFactor,
  } = useOnboardingFlow({
    initialValues,
    onBack,
    onNext,
    progressStates,
    userName,
  });

  const handleHeaderAction = () => {
    if (currentStep === "lifestyle" || currentStep === "preferences") {
      setSkipDialogOpen(true);
      return;
    }

    handleSkipCurrentStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <OnBoardingLayout
          actionDisabled={!currentStepMeta.isComplete}
          actionLabel={currentStepMeta.actionLabel}
          description={currentStepMeta.description}
          footerDescription={currentStepMeta.footerDescription}
          footerDescriptionKey={currentStepMeta.footerDescriptionKey}
          headerActionLabel={currentStepMeta.headerActionLabel}
          onBack={handleBack}
          onHeaderAction={
            currentStep === "lifestyle" || currentStep === "preferences"
              ? handleHeaderAction
              : undefined
          }
          progressStates={currentStepMeta.progressStates}
          title={currentStepMeta.title}
        >
          {currentStep === "basic-info" ? (
            <OnBoardingBasicInfoStep
              values={formValues}
              onFieldChange={handleChangeBasicInfoField}
              onGenderChange={handleSelectGender}
            />
          ) : null}

          {currentStep === "school-info" ? (
            <OnBoardingSchoolInfoStep
              values={formValues}
              onFieldChange={handleChangeSchoolInfoField}
              onDormitoryChange={handleSelectDormitory}
              onSemesterTypeChange={handleSelectSemesterType}
            />
          ) : null}

          {currentStep === "lifestyle" ? (
            <OnBoardingLifestyleStep
              values={formValues}
              onSingleSelectChange={handleSelectLifestyleSingle}
              onMultiSelectChange={handleToggleLifestyleMulti}
            />
          ) : null}

          {currentStep === "preferences" ? (
            <OnBoardingPriorityStep
              selectedFactors={formValues.priorityFactors}
              onToggleFactor={handleTogglePriorityFactor}
            />
          ) : null}
        </OnBoardingLayout>
      </form>

      <OnBoardingSkipDialog
        open={skipDialogOpen}
        onOpenChange={setSkipDialogOpen}
        onContinue={() => {
          setSkipDialogOpen(false);
        }}
        onSkip={() => {
          setSkipDialogOpen(false);
          handleSkipCurrentStep();
        }}
      />
    </>
  );
}

export { OnBoardingPageContent };
