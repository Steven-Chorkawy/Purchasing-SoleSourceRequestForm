import * as React from 'react';
import styles from './SoleSourceRequestForm.module.scss';
import { ISoleSourceRequestFormProps } from './ISoleSourceRequestFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { MessageBar, MessageBarType } from '@fluentui/react';
import {
  Form,
  FormElement,
  FormRenderProps,
  FormSubmitClickEvent,
} from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Stepper } from "@progress/kendo-react-layout";
import { DepartmentDetails } from './DepartmentDetails';
import { VendorDetails } from './VendorDetails';
import { ValueDetails } from './ValueDetails';
import { ReasonForSoleSourceDetails } from './ReasonForSoleSourceReason';
import { ITSoleSourceDetails } from './ITSoleSourceDetails';
import { LegalAgreementDetails } from './LegalAgreementDetails';


const stepPages = [DepartmentDetails, VendorDetails, ValueDetails, ReasonForSoleSourceDetails, ITSoleSourceDetails, LegalAgreementDetails];

interface IStepsInterface {
  isValid: boolean | undefined;
  label: string;
}

interface ISoleSourceRequestFormState {
  step: number;
  formState: Object;
  steps: Array<IStepsInterface>;
}

export default class SoleSourceRequestForm extends React.Component<ISoleSourceRequestFormProps, ISoleSourceRequestFormState> {

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      formState: {},
      steps: [
        { label: "Department Information", isValid: undefined },
        { label: "Vendor Information", isValid: undefined },
        { label: "Value of Purchase", isValid: undefined },
        { label: "Reason for Sole Source", isValid: undefined },
        { label: "Rational for Sole Source", isValid: undefined },
        { label: "IT Sole Source Purchase", isValid: undefined },
        { label: "Legal Agreement", isValid: undefined },
      ],
    };

    this.lastStepIndex = this.state.steps.length - 1;
    this.isLastStep = this.lastStepIndex === this.state.step;
  }

  private lastStepIndex:number = undefined;
  private isLastStep:boolean = undefined

  private onStepSubmit = (event: FormSubmitClickEvent) => {
    const { isValid, values } = event;

    const currentSteps = this.state.steps.map(
      (currentStep: IStepsInterface, index: number) => ({
        ...currentStep,
        isValid: index === this.state.step ? isValid : currentStep.isValid,
      })
    );

    this.setState({ steps: currentSteps });

    if (!isValid) {
      return;
    }

    this.setState({
      step: Math.min(this.state.step + 1, this.lastStepIndex),
      formState: values,
    });

    if (this.lastStepIndex === this.state.step) {
      alert(JSON.stringify(values));
    }
  };

  private onPrevClick = (event) => {
    event.preventDefault();
    this.setState({ step: Math.max(this.state.step - 1, 0) });
  };

  public render(): React.ReactElement<ISoleSourceRequestFormProps> {
    const {
      description,
    } = this.props;

    return (
      <div>
        <h1>Sole Source Request Form</h1>
        <MessageBar messageBarType={MessageBarType.warning}>
          <b>* Client must ensure that the form is reviewed by the Purchasing Division prior to receiving any departmental approval.</b>
        </MessageBar>
        <MessageBar messageBarType={MessageBarType.warning}>
          <b>* Proper approvals must be obtained for sole source purchases prior to the commitment for the purchase of the goods or services.</b>
        </MessageBar>
        <hr />

        <Stepper value={this.state.step} items={this.state.steps} />
        <div>
          <Form
            initialValues={this.state.formState}
            onSubmitClick={this.onStepSubmit}
            render={(formRenderProps: FormRenderProps) => (
              <div style={{ alignSelf: "center" }}>
                <FormElement style={{ width: 480 }}>
                  {stepPages[this.state.step]}
                  <span
                    style={{ marginTop: "40px" }}
                    className={"k-form-separator"}
                  />
                  <div
                    style={{
                      justifyContent: "space-between",
                      alignContent: "center",
                    }}
                    className={
                      "k-form-buttons k-button k-button-md k-rounded-md k-button-solid k-button-solid-bases-end"
                    }
                  >
                    <span style={{ alignSelf: "center" }}>
                      Step {this.state.step + 1} of 3
                    </span>
                    <div>
                      {this.state.step !== 0 ? (
                        <Button
                          style={{ marginRight: "16px" }}
                          onClick={this.onPrevClick}
                        >
                          Previous
                        </Button>
                      ) : undefined}
                      <Button
                        themeColor={"primary"}
                        disabled={!formRenderProps.allowSubmit}
                        onClick={formRenderProps.onSubmit}
                      >
                        {this.isLastStep ? "Submit" : "Next"}
                      </Button>
                    </div>
                  </div>
                </FormElement>
              </div>
            )}
          />
        </div>

      </div>
    );
  }
}
