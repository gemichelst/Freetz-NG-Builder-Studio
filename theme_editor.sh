sed -i '/<StepLink step={10} current={activeStep}/i\            <StepLink step={11} current={activeStep} onClick={() => setActiveStep(11)} label="Theme Editor" icon={<Settings className="w-4 h-4" />} />' src/App.tsx

sed -i '/{activeStep === 10 && (/i\            {activeStep === 11 && (\
              <StepWrapper key="step11">\
                <ThemeEditorStep />\
              </StepWrapper>\
            )}' src/App.tsx
