/**
 * MediCare Connect - HL7 v2.x Standard Message Parser
 * Parses HL7 pipe-and-hat delimited clinical messages (MSH, PID, PV1, OBR, OBX, DG1, SCH).
 */

export interface HL7Segment {
  name: string;
  fields: string[];
}

export interface HL7ParsedMessage {
  messageType: string;
  triggerEvent: string;
  messageControlId: string;
  sendingApplication: string;
  sendingFacility: string;
  dateTime: string;
  segments: HL7Segment[];
}

export class HL7v2Parser {
  private static readonly FIELD_SEP = '|';
  private static readonly COMPONENT_SEP = '^';

  public static parse(rawMessage: string): HL7ParsedMessage {
    const rawLines = rawMessage.split(/[\r\n]+/).map((l) => l.trim()).filter((l) => l.length > 0);
    const segments: HL7Segment[] = [];

    let messageType = 'UNKNOWN';
    let triggerEvent = 'UNKNOWN';
    let messageControlId = '';
    let sendingApplication = '';
    let sendingFacility = '';
    let dateTime = '';

    for (const line of rawLines) {
      const segName = line.substring(0, 3).toUpperCase();
      let fields: string[] = [];

      if (segName === 'MSH') {
        // In MSH, MSH-1 is the delimiter itself ('|')
        const rest = line.substring(4);
        fields = ['|', ...rest.split(this.FIELD_SEP)];

        sendingApplication = fields[2] || '';
        sendingFacility = fields[3] || '';
        dateTime = fields[6] || '';
        const msgTypeField = fields[8] || '';
        const msgParts = msgTypeField.split(this.COMPONENT_SEP);
        messageType = msgParts[0] || 'UNKNOWN';
        triggerEvent = msgParts[1] || 'UNKNOWN';
        messageControlId = fields[9] || '';
      } else {
        fields = line.split(this.FIELD_SEP).slice(1);
      }

      segments.push({ name: segName, fields });
    }

    return {
      messageType,
      triggerEvent,
      messageControlId,
      sendingApplication,
      sendingFacility,
      dateTime,
      segments,
    };
  }

  public static getSegmentsByName(parsed: HL7ParsedMessage, name: string): HL7Segment[] {
    return parsed.segments.filter((s) => s.name.toUpperCase() === name.toUpperCase());
  }

  public static extractPatientInfo(parsed: HL7ParsedMessage): {
    patientId: string;
    lastName: string;
    firstName: string;
    dob: string;
    gender: string;
  } | undefined {
    const pid = parsed.segments.find((s) => s.name === 'PID');
    if (!pid) return undefined;

    const id = pid.fields[2] || pid.fields[3] || '';
    const nameField = pid.fields[4] || '';
    const nameParts = nameField.split(this.COMPONENT_SEP);
    const lastName = nameParts[0] || '';
    const firstName = nameParts[1] || '';
    const dob = pid.fields[6] || '';
    const gender = pid.fields[7] || '';

    return { patientId: id, lastName, firstName, dob, gender };
  }
}
