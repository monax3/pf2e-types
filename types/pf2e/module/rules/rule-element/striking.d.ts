import { ActorType } from '../../actor/types.ts';
import { RuleElement } from './base.ts';
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from './data.ts';
import fields = foundry.data.fields;
declare class StrikingRuleElement extends RuleElement<StrikingRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): StrikingRuleSchema;
    beforePrepareData(): void;
}
interface StrikingRuleElement extends RuleElement<StrikingRuleSchema>, ModelPropsFromRESchema<StrikingRuleSchema> {
}
type StrikingRuleSchema = RuleElementSchema & {
    selector: fields.StringField<string, string, true, false, false>;
    value: ResolvableValueField<false, false, false>;
};
export { StrikingRuleElement };
