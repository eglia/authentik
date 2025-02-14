import { CoreApi, User } from "authentik-api";
import { t } from "@lingui/macro";
import { customElement } from "lit-element";
import { html, TemplateResult } from "lit-html";
import { DEFAULT_CONFIG } from "../../api/Config";
import { ifDefined } from "lit-html/directives/if-defined";
import "../../elements/forms/HorizontalFormElement";
import "../../elements/CodeMirror";
import YAML from "yaml";
import { first } from "../../utils";
import { ModelForm } from "../../elements/forms/ModelForm";

@customElement("ak-user-form")
export class UserForm extends ModelForm<User, number> {

    loadInstance(pk: number): Promise<User> {
        return new CoreApi(DEFAULT_CONFIG).coreUsersRetrieve({
            id: pk
        });
    }

    getSuccessMessage(): string {
        if (this.instance) {
            return t`Successfully updated user.`;
        } else {
            return t`Successfully created user.`;
        }
    }

    send = (data: User): Promise<User> => {
        if (this.instance) {
            return new CoreApi(DEFAULT_CONFIG).coreUsersUpdate({
                id: this.instance.pk || 0,
                userRequest: data
            });
        } else {
            return new CoreApi(DEFAULT_CONFIG).coreUsersCreate({
                userRequest: data
            });
        }
    };

    renderForm(): TemplateResult {
        return html`<form class="pf-c-form pf-m-horizontal">
            <ak-form-element-horizontal
                label=${t`Username`}
                ?required=${true}
                name="username">
                <input type="text" value="${ifDefined(this.instance?.username)}" class="pf-c-form-control" required>
                <p class="pf-c-form__helper-text">${t`Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.`}</p>
            </ak-form-element-horizontal>
            <ak-form-element-horizontal
                label=${t`Name`}
                ?required=${true}
                name="name">
                <input type="text" value="${ifDefined(this.instance?.name)}" class="pf-c-form-control" required>
                <p class="pf-c-form__helper-text">${t`User's display name.`}</p>
            </ak-form-element-horizontal>
            <ak-form-element-horizontal
                label=${t`Email`}
                ?required=${true}
                name="email">
                <input type="email" autocomplete="off" value="${ifDefined(this.instance?.email)}" class="pf-c-form-control" required>
            </ak-form-element-horizontal>
            <ak-form-element-horizontal
                name="isActive">
                <div class="pf-c-check">
                    <input type="checkbox" class="pf-c-check__input" ?checked=${first(this.instance?.isActive, true)}>
                    <label class="pf-c-check__label">
                        ${t`Is active`}
                    </label>
                </div>
                <p class="pf-c-form__helper-text">${t`Designates whether this user should be treated as active. Unselect this instead of deleting accounts.`}</p>
            </ak-form-element-horizontal>
            <ak-form-element-horizontal
                label=${t`Attributes`}
                ?required=${true}
                name="attributes">
                <ak-codemirror mode="yaml" value="${YAML.stringify(first(this.instance?.attributes, {}))}">
                </ak-codemirror>
                <p class="pf-c-form__helper-text">${t`Set custom attributes using YAML or JSON.`}</p>
            </ak-form-element-horizontal>
        </form>`;
    }

}
