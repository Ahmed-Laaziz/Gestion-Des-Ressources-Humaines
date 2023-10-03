import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
const cadreOptions = ['professeur', 'ingénieur'];
export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <Grid container spacing={2} style={{marginTop:"2%"}}>
            <Grid item xs={4} >
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Prénom (الإسم)
                </Typography>
                <TextField
                //   label="French Label 1"
                  variant="outlined"
                  fullWidth
                  // Add necessary props and event handlers
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Nom (النسب)
                </Typography>
                <TextField
                  
                  variant="outlined"
                  fullWidth
                  // Add necessary props and event handlers
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  CIN (رقم ب.ت.وطنية)
                </Typography>
                <TextField
                //   label="French Label 3"
                  variant="outlined"
                  fullWidth
                  // Add necessary props and event handlers
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Email (البريد الإلكتروني)
                </Typography>
                <TextField
                //   label="French Label 3"
                  variant="outlined"
                  fullWidth
                  // Add necessary props and event handlers
                />
              </div>
            </Grid>
            <Grid item xs={6}>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                Numéro de téléphone (رقم الهاتف)
                </Typography>
                <TextField
                //   label="French Label 1"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+212</InputAdornment>
                    ),
                  }}
                  // Add necessary props and event handlers
                />
              </div>
            </Grid>
            
          </Grid>
        )}

{activeStep === 1 && (
          <Grid container spacing={2} style={{marginTop:"2%"}}>
            <Grid item xs={4} >
            <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Cadre (الإطار )
                </Typography>
                <Autocomplete
                  id="cadre-autocomplete"
                  options={cadreOptions}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Classe (الدرجة)
                </Typography>
                <Autocomplete
                  id="cadre-autocomplete"
                  options={cadreOptions}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                  
                Grade (الرتبة)
                </Typography>
                <Autocomplete
                  id="cadre-autocomplete"
                  options={cadreOptions}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Email (البريد الإلكتروني)
                </Typography>
                <TextField
                //   label="French Label 3"
                  variant="outlined"
                  fullWidth
                  // Add necessary props and event handlers
                />
              </div>
            </Grid>
            <Grid item xs={6}>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                Numéro de téléphone (رقم الهاتف)
                </Typography>
                <TextField
                //   label="French Label 1"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+212</InputAdornment>
                    ),
                  }}
                  // Add necessary props and event handlers
                />
              </div>
            </Grid>
            
          </Grid>
        )}
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
