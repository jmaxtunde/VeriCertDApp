import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.upnetwork{
   export enum Typeprog {
      Undergraduate,
      Master,
      Phd,
      Diploma,
      Seminar,
   }
   export class Program extends Asset {
      progId: string;
      type: Typeprog;
      university: string;
      department: string;
   }
   export class Degree extends Asset {
      degreeId: string;
      title: string;
      owner: Member;
      student: Student;
      employer: Employer;
      prog: Program;
   }
   export class Member extends Participant {
      email: string;
      firstName: string;
      lastName: string;
   }
   export class Student extends Participant {
      emailstudent: string;
      firstName: string;
      lastName: string;
   }
   export class Employer extends Participant {
      emailemployer: string;
      firstName: string;
   }
   export class RecordDegree extends Transaction {
      titulo: Degree;
      graduando: Student;
   }
   export class VerifyDegree extends Transaction {
      titulo: Degree;
      empl: Employer;
   }
// }
