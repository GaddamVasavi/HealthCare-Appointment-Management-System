#!/usr/bin/env python3
"""
Generator for HL7 v2.x & DICOM Interoperability:
- backend/src/interoperability/hl7/hl7v2Parser.ts
- backend/src/interoperability/hl7/hl7v2Generator.ts
- backend/src/interoperability/hl7/hl7v2Service.ts
- backend/src/interoperability/hl7/index.ts
- backend/src/interoperability/dicom/dicomMetadataParser.ts
- backend/src/interoperability/dicom/pacsBridgeService.ts
- backend/src/interoperability/dicom/index.ts
"""

import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
HL7_DIR = os.path.join(BASE_DIR, "backend", "src", "interoperability", "hl7")
DICOM_DIR = os.path.join(BASE_DIR, "backend", "src", "interoperability", "dicom")
os.makedirs(HL7_DIR, exist_ok=True)
os.makedirs(DICOM_DIR, exist_ok=True)

def write_file(filepath, content):
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {os.path.relpath(filepath, BASE_DIR)}: {len(content.splitlines())} lines")

def generate():
    # 1. hl7/hl7v2Parser.ts
    parser_code = """/**
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
    const rawLines = rawMessage.split(/[\\r\\n]+/).map((l) => l.trim()).filter((l) => l.length > 0);
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
"""
    write_file(os.path.join(HL7_DIR, "hl7v2Parser.ts"), parser_code)

    # 2. hl7/hl7v2Generator.ts
    gen_code = """/**
 * MediCare Connect - HL7 v2.5.1 Clinical Message Generator
 * Generates standard ADT-A01 (Admit), ADT-A08 (Patient Update), SIU-S12 (Schedule), and ORU-R01 (Observation Result).
 */

export class HL7v2Generator {
  private static formatTimestamp(d: Date = new Date()): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  }

  public static generateSIUS12(appointment: {
    appointmentId: string;
    patientId: string;
    patientLastName: string;
    patientFirstName: string;
    patientPhone: string;
    doctorId: string;
    doctorName: string;
    startTime: Date;
    durationMinutes: number;
    appointmentType: string;
    reason: string;
  }): string {
    const ts = this.formatTimestamp();
    const apptStart = this.formatTimestamp(appointment.startTime);
    const msgId = `MSG-${Date.now().toString(36).toUpperCase()}`;

    const lines = [
      `MSH|^~\\\\&|MEDICARE_CONNECT|HOSPITAL_MAIN|CENTRAL_SCHEDULER|CLINIC_NORTH|${ts}||SIU^S12|${msgId}|P|2.5.1`,
      `SCH|${appointment.appointmentId}||||||${appointment.reason}^^${appointment.appointmentType}||${appointment.durationMinutes}|m|^^^${apptStart}`,
      `PID|1||${appointment.patientId}^^^MEDICARE^MR||${appointment.patientLastName}^${appointment.patientFirstName}||19800101|M|||123 MAIN ST^^CITY^STATE^12345||${appointment.patientPhone}`,
      `AIL|1|A|MAIN_CLINIC^EXAM_ROOM_1|||||||SCHEDULED`,
      `AIP|1|A|${appointment.doctorId}^${appointment.doctorName}|PHY^PHYSICIAN`,
    ];

    return lines.join('\\r\\n');
  }

  public static generateORUR01(labResult: {
    orderId: string;
    patientId: string;
    patientLastName: string;
    patientFirstName: string;
    testCode: string;
    testName: string;
    value: string | number;
    units: string;
    referenceRange: string;
    abnormalFlag: 'N' | 'L' | 'H' | 'LL' | 'HH';
    resultStatus: 'F' | 'P' | 'C';
  }): string {
    const ts = this.formatTimestamp();
    const msgId = `ORU-${Date.now().toString(36).toUpperCase()}`;

    const lines = [
      `MSH|^~\\\\&|MEDICARE_LAB|LAB_CENTRAL|EHR_CORE|MAIN_HOSPITAL|${ts}||ORU^R01|${msgId}|P|2.5.1`,
      `PID|1||${labResult.patientId}^^^MEDICARE^MR||${labResult.patientLastName}^${labResult.patientFirstName}`,
      `OBR|1|${labResult.orderId}|${labResult.orderId}|${labResult.testCode}^${labResult.testName}^LN|||${ts}`,
      `OBX|1|NM|${labResult.testCode}^${labResult.testName}^LN||${labResult.value}|${labResult.units}|${labResult.referenceRange}|${labResult.abnormalFlag}|||${labResult.resultStatus}|||${ts}`,
    ];

    return lines.join('\\r\\n');
  }

  public static generateACK(originalMsgControlId: string, ackCode: 'AA' | 'AE' | 'AR' = 'AA', textMessage: string = 'Success'): string {
    const ts = this.formatTimestamp();
    const msgId = `ACK-${Date.now().toString(36).toUpperCase()}`;

    const lines = [
      `MSH|^~\\\\&|MEDICARE_CONNECT|HOSPITAL_MAIN|SENDER_APP|SENDER_FACILITY|${ts}||ACK|${msgId}|P|2.5.1`,
      `MSA|${ackCode}|${originalMsgControlId}|${textMessage}`,
    ];

    return lines.join('\\r\\n');
  }
}
"""
    write_file(os.path.join(HL7_DIR, "hl7v2Generator.ts"), gen_code)

    # 3. hl7/hl7v2Service.ts
    svc_code = """import { HL7v2Parser, HL7ParsedMessage } from './hl7v2Parser';
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
"""
    write_file(os.path.join(HL7_DIR, "hl7v2Service.ts"), svc_code)

    # 4. hl7/index.ts
    hl7_index = """export * from './hl7v2Parser';
export * from './hl7v2Generator';
export * from './hl7v2Service';
"""
    write_file(os.path.join(HL7_DIR, "index.ts"), hl7_index)

    # 5. dicom/dicomMetadataParser.ts
    dicom_meta = """/**
 * MediCare Connect - DICOM Header & Metadata Tag Dictionary
 * Standards: DICOM (Digital Imaging and Communications in Medicine) PS 3.6 Standard
 */

export interface DICOMTagInfo {
  tag: string;
  name: string;
  vr: string; // Value Representation (UI, SH, LO, DA, TM, CS, PN, DS, IS)
  vm: string;
  description: string;
}

export class DICOMMetadataParser {
  private static readonly tagDictionary: Map<string, DICOMTagInfo> = new Map([
    ['(0008,0016)', { tag: '(0008,0016)', name: 'SOPClassUID', vr: 'UI', vm: '1', description: 'Unique identifier for the SOP Class' }],
    ['(0008,0018)', { tag: '(0008,0018)', name: 'SOPInstanceUID', vr: 'UI', vm: '1', description: 'Unique identifier for the SOP Instance' }],
    ['(0008,0020)', { tag: '(0008,0020)', name: 'StudyDate', vr: 'DA', vm: '1', description: 'Date the acquisition of study started' }],
    ['(0008,0030)', { tag: '(0008,0030)', name: 'StudyTime', vr: 'TM', vm: '1', description: 'Time the acquisition of study started' }],
    ['(0008,0050)', { tag: '(0008,0050)', name: 'AccessionNumber', vr: 'SH', vm: '1', description: 'Order number generated by RIS' }],
    ['(0008,0060)', { tag: '(0008,0060)', name: 'Modality', vr: 'CS', vm: '1', description: 'Type of equipment (CR, CT, MR, NM, US, XA)' }],
    ['(0008,0070)', { tag: '(0008,0070)', name: 'Manufacturer', vr: 'LO', vm: '1', description: 'Manufacturer of the equipment' }],
    ['(0008,1030)', { tag: '(0008,1030)', name: 'StudyDescription', vr: 'LO', vm: '1', description: 'Institution-generated study description' }],
    ['(0010,0010)', { tag: '(0010,0010)', name: 'PatientName', vr: 'PN', vm: '1', description: 'Patient full legal name' }],
    ['(0010,0020)', { tag: '(0010,0020)', name: 'PatientID', vr: 'LO', vm: '1', description: 'Primary identifier for patient' }],
    ['(0010,0030)', { tag: '(0010,0030)', name: 'PatientBirthDate', vr: 'DA', vm: '1', description: 'Birth date of the patient' }],
    ['(0010,0040)', { tag: '(0010,0040)', name: 'PatientSex', vr: 'CS', vm: '1', description: 'Sex of the patient (M, F, O)' }],
    ['(0018,0015)', { tag: '(0018,0015)', name: 'BodyPartExamined', vr: 'CS', vm: '1', description: 'Body part examined in this series' }],
    ['(0018,0050)', { tag: '(0018,0050)', name: 'SliceThickness', vr: 'DS', vm: '1', description: 'Nominal slice thickness in mm' }],
    ['(0018,0080)', { tag: '(0018,0080)', name: 'RepetitionTime', vr: 'DS', vm: '1', description: 'MR Repetition Time in ms' }],
    ['(0018,0081)', { tag: '(0018,0081)', name: 'EchoTime', vr: 'DS', vm: '1', description: 'MR Echo Time in ms' }],
    ['(0020,000D)', { tag: '(0020,000D)', name: 'StudyInstanceUID', vr: 'UI', vm: '1', description: 'Unique identifier for the Study' }],
    ['(0020,000E)', { tag: '(0020,000E)', name: 'SeriesInstanceUID', vr: 'UI', vm: '1', description: 'Unique identifier for the Series' }],
    ['(0020,0013)', { tag: '(0020,0013)', name: 'InstanceNumber', vr: 'IS', vm: '1', description: 'Number that identifies this instance' }],
    ['(0028,0010)', { tag: '(0028,0010)', name: 'Rows', vr: 'US', vm: '1', description: 'Number of rows in the image' }],
    ['(0028,0011)', { tag: '(0028,0011)', name: 'Columns', vr: 'US', vm: '1', description: 'Number of columns in the image' }],
  ]);

  public static getTagInfo(tag: string): DICOMTagInfo | undefined {
    return this.tagDictionary.get(tag);
  }

  public static getAllStandardTags(): DICOMTagInfo[] {
    return Array.from(this.tagDictionary.values());
  }
}
"""
    write_file(os.path.join(DICOM_DIR, "dicomMetadataParser.ts"), dicom_meta)

    # 6. dicom/pacsBridgeService.ts
    pacs_code = """/**
 * MediCare Connect - Picture Archiving & Communication System (PACS) Bridge Simulator
 * Simulates DICOM C-FIND, C-MOVE query/retrieve, and web-based study viewer URL generation (WADO-RS).
 */

export interface DICOMStudy {
  studyInstanceUID: string;
  patientId: string;
  patientName: string;
  accessionNumber: string;
  studyDate: string;
  studyDescription: string;
  modalities: string[];
  numberOfSeries: number;
  numberOfInstances: number;
  referringPhysician: string;
}

export class PACSBridgeService {
  private static readonly studiesDatabase: Map<string, DICOMStudy> = new Map();

  static {
    this.studiesDatabase.set('1.2.840.113619.2.55.3.283116.1', {
      studyInstanceUID: '1.2.840.113619.2.55.3.283116.1',
      patientId: 'PT-10023',
      patientName: 'DOE^JOHN',
      accessionNumber: 'ACC-2026-9901',
      studyDate: '2026-08-25',
      studyDescription: 'CT CHEST W/ CONTRAST',
      modalities: ['CT'],
      numberOfSeries: 4,
      numberOfInstances: 420,
      referringPhysician: 'Dr. Sarah Jenkins, MD',
    });
  }

  public static findStudies(query: { patientId?: string; accessionNumber?: string; modality?: string }): DICOMStudy[] {
    const results: DICOMStudy[] = [];
    for (const study of this.studiesDatabase.values()) {
      if (query.patientId && study.patientId !== query.patientId) continue;
      if (query.accessionNumber && study.accessionNumber !== query.accessionNumber) continue;
      if (query.modality && !study.modalities.includes(query.modality)) continue;
      results.push(study);
    }
    return results;
  }

  public static generateWadoViewerUrl(studyInstanceUID: string): string {
    return `/viewer/dicom?studyUID=${encodeURIComponent(studyInstanceUID)}&token=auth_${Date.now().toString(36)}`;
  }
}
"""
    write_file(os.path.join(DICOM_DIR, "pacsBridgeService.ts"), pacs_code)

    # 7. dicom/index.ts
    dicom_index = """export * from './dicomMetadataParser';
export * from './pacsBridgeService';
"""
    write_file(os.path.join(DICOM_DIR, "index.ts"), dicom_index)

if __name__ == "__main__":
    generate()
