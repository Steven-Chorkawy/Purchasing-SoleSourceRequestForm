import * as React from 'react';
import { ISoleSourceRequestFormProps } from './ISoleSourceRequestFormProps';
import { Button, MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';
import {
  Field,
  FieldWrapper,
  Form,
  FormElement,
  FormRenderProps,
  FormSubmitClickEvent,
} from "@progress/kendo-react-form";
import { Label } from '@progress/kendo-react-labels';
import { FolderExplorer, ModernTaxonomyPicker } from '@pnp/spfx-controls-react';
import { PDFExport } from '@progress/kendo-react-pdf';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";

interface ISoleSourceRequestFormState {
}

export const b64ToBlob = (base64: string, type: string = 'application/octet-stream'): Blob => {
  const byteArray = Uint8Array.from(
    atob(base64)
      .split('')
      .map((char) => char.charCodeAt(0))
  );
  return new Blob([byteArray], { type });
};

export default class SoleSourceRequestForm extends React.Component<ISoleSourceRequestFormProps, ISoleSourceRequestFormState> {

  constructor(props) {
    super(props);

    this.pdfExportComponent = React.createRef<PDFExport>();
  }

  private pdfExportComponent;

  private exportPDFWithComponent = () => {
    if (this.pdfExportComponent.current) {
      this.pdfExportComponent.current.save();
    }
  };

  private drawDOMExport = () => {
    let exportElement = document.querySelector('#ExportHere') as any;

    drawDOM(
      exportElement,
      {
        paperSize: "A4",
        margin: { left: 40, right: 40, top: 40, bottom: 40 },
      }
    )
      .then((group) => { return exportPDF(group); })
      .then((dataUri) => {
        let base64Test = dataUri.split(";base64,")[1];
        console.log(dataUri);
        console.log(base64Test);

        let myBlobFile = b64ToBlob(base64Test, 'application/pdf');

        sp.web.getFolderByServerRelativeUrl('/sites/Purchasing/SoleSourceRequests/Test').files.add('Base64Test.pdf', myBlobFile, true)
      })
  }

  private handleSubmit = (values) => {
    console.log('handleSubmit');
    console.log(values);
  }

  private onTaxPickerChange(terms) {
    console.log("Terms", terms);
  }

  public render(): React.ReactElement<ISoleSourceRequestFormProps> {
    const {
      description,
    } = this.props;

    return (
      <div>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={this.exportPDFWithComponent}
        >
          Export with component
        </button>

        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={this.drawDOMExport}
        >
          Export with Base64Blob
        </button>
        <PDFExport
          ref={this.pdfExportComponent}
          paperSize="A4"
          margin={40}
          fileName={`Report for ${new Date().getFullYear()}`}
          author="Sole Source Form"
        >

          <Form
            onSubmit={this.handleSubmit}
            render={(formRenderProps: FormRenderProps) => (

              <div id="ExportHere">
                <h1>Sole Source Request Form</h1>
                <MessageBar messageBarType={MessageBarType.warning}>
                  <b>* Client must ensure that the form is reviewed by the Purchasing Division prior to receiving any departmental approval.</b>
                </MessageBar>
                <MessageBar messageBarType={MessageBarType.warning}>
                  <b>* Proper approvals must be obtained for sole source purchases prior to the commitment for the purchase of the goods or services.</b>
                </MessageBar>
                <FormElement>
                  <legend className={"k-form-legend"}>Department Information</legend>
                  <FieldWrapper>
                    <div className={"k-form-field-wrap"}>
                      <ModernTaxonomyPicker
                        allowMultipleSelections={false}
                        termSetId="8ed8c9ea-7052-4c1d-a4d7-b9c10bffea6f"
                        panelTitle="Select Term"
                        label="Taxonomy Picker"
                        context={this.props.context}
                        onChange={this.onTaxPickerChange}
                      />
                    </div>
                  </FieldWrapper>

                  <FieldWrapper>
                    <Label editorId={'Department2'} >
                      {'Department2'}
                    </Label>
                    <div className={"k-form-field-wrap"}>
                      <TextField id={'Department2'} name={'Department2'} />
                    </div>
                  </FieldWrapper>

                  <legend className={"k-form-legend"}>Vendor Information</legend>

                  <div className="k-form-buttons">
                    <PrimaryButton text="Submit" type='submit' allowDisabledFocus disabled={!formRenderProps.allowSubmit} />
                  </div>
                </FormElement>
              </div>
            )}
          />
        </PDFExport>
      </div >
    );
  }
}
