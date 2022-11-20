import { LightningElement} from 'lwc';
import staticResources from '@salesforce/resourceUrl/PortfolioStaticResources'

const NAME = 'Justin L. Martin'
const TITLE = 'Salesforce Portfolio'
const STATIC_RESOURCE_PATH = `${staticResources}/PortfolioStaticResources/`

export default class PortfolioHeader extends LightningElement {

    connectedCallback(){}

    renderedCallback(){}

    get name() {
        return NAME;
    }

    get title() {
        return TITLE;
    }

    get headerImage() {
        return `${STATIC_RESOURCE_PATH}PortfolioHeader-800.png`
    }

    get platformAppBuilderBadge() {
        return `${STATIC_RESOURCE_PATH}PlatformAppBuilder-200.png`
    }

    get javascriptDeveloperBadge() {
        return `${STATIC_RESOURCE_PATH}JavaScriptDeveloper1-200.png`
    }
}