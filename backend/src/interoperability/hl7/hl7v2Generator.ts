/**
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
      `MSH|^~\\&|MEDICARE_CONNECT|HOSPITAL_MAIN|CENTRAL_SCHEDULER|CLINIC_NORTH|${ts}||SIU^S12|${msgId}|P|2.5.1`,
      `SCH|${appointment.appointmentId}||||||${appointment.reason}^^${appointment.appointmentType}||${appointment.durationMinutes}|m|^^^${apptStart}`,
      `PID|1||${appointment.patientId}^^^MEDICARE^MR||${appointment.patientLastName}^${appointment.patientFirstName}||19800101|M|||123 MAIN ST^^CITY^STATE^12345||${appointment.patientPhone}`,
      `AIL|1|A|MAIN_CLINIC^EXAM_ROOM_1|||||||SCHEDULED`,
      `AIP|1|A|${appointment.doctorId}^${appointment.doctorName}|PHY^PHYSICIAN`,
    ];

    return lines.join('\r\n');
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
      `MSH|^~\\&|MEDICARE_LAB|LAB_CENTRAL|EHR_CORE|MAIN_HOSPITAL|${ts}||ORU^R01|${msgId}|P|2.5.1`,
      `PID|1||${labResult.patientId}^^^MEDICARE^MR||${labResult.patientLastName}^${labResult.patientFirstName}`,
      `OBR|1|${labResult.orderId}|${labResult.orderId}|${labResult.testCode}^${labResult.testName}^LN|||${ts}`,
      `OBX|1|NM|${labResult.testCode}^${labResult.testName}^LN||${labResult.value}|${labResult.units}|${labResult.referenceRange}|${labResult.abnormalFlag}|||${labResult.resultStatus}|||${ts}`,
    ];

    return lines.join('\r\n');
  }

  public static generateACK(originalMsgControlId: string, ackCode: 'AA' | 'AE' | 'AR' = 'AA', textMessage: string = 'Success'): string {
    const ts = this.formatTimestamp();
    const msgId = `ACK-${Date.now().toString(36).toUpperCase()}`;

    const lines = [
      `MSH|^~\\&|MEDICARE_CONNECT|HOSPITAL_MAIN|SENDER_APP|SENDER_FACILITY|${ts}||ACK|${msgId}|P|2.5.1`,
      `MSA|${ackCode}|${originalMsgControlId}|${textMessage}`,
    ];

    return lines.join('\r\n');
  }
}
