# Custom lookup Salesforce Lightning component
Files:
1. Apes class and its test for query salesforce data
2. Lightning components

## How Do You deploy: 
I. Deploy the Apex class(es)  [*You cannot create new objects directly in Production]
  1. Create the Apex class and the Test Apex class in your sandbox environment.
  2. create an outbound change that incldes the 2 Apex classes.
  3. In your production environment, create an inbound change that takes in the above outbound change. The change will automatically get deploied if the test(s) are all passed.

II. Deploy the Lightning Component(s)  [*Lightning components can be deploied directly to Prod/sandbox]
https://trailhead.salesforce.com/content/learn/trails/build-lightning-web-components

  1. Enable 'Dev Hub' under 'Setup' in your production environment.
  2. Get the Salesforce DX extension on your VS Code IDE.
  3. Connect to your Salesforce environment via Salesforce CLI.
  4. Push/deploy your change to the component via Salesforce CLI.

III. Use your custom Lightning Web Component in your environment
  1. Go to any Salesforce object page, or even the Home page.
  2. Go to the setup icon, you should see 'Edit Page' or 'Edit Object'. If you only see 'Edit Object', go to step 4.
  3. Click on 'Edit Page', you should see your deployed Lightning component on the left.
  4. Click on 'Edit Object', then find 'Lightning Record Pages' on the left, click on it, you should see a list of the page objects, click on any and click 'Edit'.
  5. Drag your Lightning component to the page and click 'Save' on the top right corner.
 
 
## Salesforce DX Project reads

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
