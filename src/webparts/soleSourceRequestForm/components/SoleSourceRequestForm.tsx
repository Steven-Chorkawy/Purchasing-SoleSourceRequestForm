import * as React from 'react';
import { ISoleSourceRequestFormProps } from './ISoleSourceRequestFormProps';
import { DynamicForm } from "@pnp/spfx-controls-react/lib/DynamicForm";
import { PDFExport } from '@progress/kendo-react-pdf';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";

interface ISoleSourceRequestFormState {
}

export const b64ToBlob = (base64: string, type: string = 'application/octet-stream'): Blob => {
  const byteArray: Uint8Array = Uint8Array.from(
    atob(base64)
      .split('')
      .map((char) => char.charCodeAt(0))
  );
  return new Blob([byteArray], { type });
};

export default class SoleSourceRequestForm extends React.Component<ISoleSourceRequestFormProps, ISoleSourceRequestFormState> {
  private _pdfExportComponent: React.RefObject<PDFExport>;

  public constructor(props: ISoleSourceRequestFormProps | Readonly<ISoleSourceRequestFormProps>) {
    super(props);

    this._pdfExportComponent = React.createRef<PDFExport>();
  }

  private _exportPDFWithComponent = (): void => {
    if (this._pdfExportComponent.current) {
      this._pdfExportComponent.current.save();
    }
  };

  private _drawDOMExport = (): void => {
    const exportElement: any = document.querySelector('#ExportHere') as any;

    drawDOM(
      exportElement,
      {
        paperSize: "A4",
        margin: { left: 40, right: 40, top: 40, bottom: 40 },
      }
    )
      .then((group) => { return exportPDF(group); })
      .then((dataUri) => {
        const base64Test: string = dataUri.split(";base64,")[1];
        console.log(dataUri);
        console.log(base64Test);

        const myBlobFile: Blob = b64ToBlob(base64Test, 'application/pdf');

        sp.web.getFolderByServerRelativeUrl('/sites/Purchasing/SoleSourceRequests/Test').files.add('Base64Test.pdf', myBlobFile, true).catch(reason => {
          console.log('SOMETHING WENT WRONG WHILE UPLOADING A PDF DOCUMENT');
          console.log(reason);
        })
      }).catch(reason => {
        console.log('SOMETHING WENT WRONG WHILE EXPORTING TO PDF...');
        console.log(reason);
      });
  }

  private _handleSubmit = (values: any): void => {
    console.log('handleSubmit');
    console.log(values);
  }

  private _onTaxPickerChange(terms: any): void {
    console.log("Terms", terms);
  }

  public render(): React.ReactElement<ISoleSourceRequestFormProps> {
    return (
      <div>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={this._exportPDFWithComponent}
        >
          Export with component
        </button>

        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={this._drawDOMExport}
        >
          Export with Base64Blob
        </button>
        <PDFExport
          ref={this._pdfExportComponent}
          paperSize="A4"
          margin={40}
          fileName={`Report for ${new Date().getFullYear()}`}
          author="Sole Source Form"
        >
          <DynamicForm
            context={this.props.context}
            contentTypeId={"0x0120D52000DAE0C25BA418814BBCDA9B43C942BED9"}
            listId={"6c584d6d-4bd8-4c7e-a511-784a7f4d4515"}
            listItemId={null}
            onCancelled={() => { console.log('Cancelled') }}
            onBeforeSubmit={async (listItem) => { return true; }}
            onSubmitError={(listItem, error) => { alert(error.message); }}
            onSubmitted={async (listItemData) => { console.log(listItemData); }}
            // fieldOverrides={
            //   {
            //     'VendorAddress': (fieldProperties) => {
            //       console.log('fieldOverrides');
            //       console.log(fieldProperties);
            //       return <h1>hello</h1>
            //     }
            //   }
            // }
          >
          </DynamicForm>
          {/* <Form
            onSubmit={this._handleSubmit}
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
                        onChange={this._onTaxPickerChange}
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
          /> */}
        </PDFExport>
      </div >
    );
  }
}
