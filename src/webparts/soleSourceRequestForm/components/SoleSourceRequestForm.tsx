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
import { RationalForSoleSourceDetails } from './RationalForSoleSourceDetails';
import { ITSoleSourceDetails } from './ITSoleSourceDetails';
import { LegalAgreementDetails } from './LegalAgreementDetails';


const stepPages = [DepartmentDetails, VendorDetails, ValueDetails, ReasonForSoleSourceDetails, RationalForSoleSourceDetails, ITSoleSourceDetails, LegalAgreementDetails];

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
  }

  private lastStepIndex = this.state.steps.length - 1;
  private isLastStep = this.lastStepIndex === this.state.step;

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
      </div>
    );
  }
}
