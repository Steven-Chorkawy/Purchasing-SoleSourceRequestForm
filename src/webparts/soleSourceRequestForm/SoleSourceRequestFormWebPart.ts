import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SoleSourceRequestFormWebPartStrings';
import SoleSourceRequestForm from './components/SoleSourceRequestForm';
import { ISoleSourceRequestFormProps } from './components/ISoleSourceRequestFormProps';
import { sp } from "@pnp/sp";

import '../../bootstrap.css';
import '@progress/kendo-theme-bootstrap/dist/all.css';

export interface ISoleSourceRequestFormWebPartProps {
  description: string;
}

export default class SoleSourceRequestFormWebPart extends BaseClientSideWebPart<ISoleSourceRequestFormWebPartProps> {

  // private _isDarkTheme: boolean = false;
  // private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<ISoleSourceRequestFormProps> = React.createElement(
      SoleSourceRequestForm,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit()
      .then(() => {
        sp.setup({
          spfxContext: this.context as any,
          sp: {
            headers: {
              "Accept": "application/json; odata=nometadata"
            },
            baseUrl: this.context.pageContext.web.absoluteUrl
          }
        })
      });
  }

  // private _getEnvironmentMessage(): string {
  //   if (!!this.context.sdks.microsoftTeams) { // running in Teams
  //     return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
  //   }

  //   return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  // }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    //this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
