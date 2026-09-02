sed -i '/<StepWrapper key="step7">/!b;n;n;n;a\
            {activeStep === 8 && (\
              <StepWrapper key="step8">\
                <ImageHubStep config={config} />\
              </StepWrapper>\
            )}\
            {activeStep === 9 && (\
              <StepWrapper key="step9">\
                <WikiStep />\
              </StepWrapper>\
            )}\
            {activeStep === 10 && (\
              <StepWrapper key="step10">\
                <AboutStep />\
              </StepWrapper>\
            )}' src/App.tsx
