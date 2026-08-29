import { HL7v2Parser, HL7ParsedMessage } from './hl7v2Parser';
import { HL7v2Generator } from './hl7v2Generator';

export class HL7v2Service {
  public static processInboundMessage(rawMessage: string): {
    acknowledgment: string;
    parsed: HL7ParsedMessage;
    success: boolean;
  } {
    try {
      const parsed = HL7v2Parser.parse(rawMessage);
      const ack = HL7v2Generator.generateACK(parsed.messageControlId, 'AA', 'Message parsed and accepted successfully.');
      return { acknowledgment: ack, parsed, success: true };
    } catch (err: any) {
      const ack = HL7v2Generator.generateACK('UNKNOWN', 'AE', `Error parsing HL7: ${err.message}`);
      return { acknowledgment: ack, parsed: { messageType: 'ERR', triggerEvent: 'ERR', messageControlId: 'ERR', sendingApplication: '', sendingFacility: '', dateTime: '', segments: [] }, success: false };
    }
  }
}
