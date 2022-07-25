import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.scss']
})
export class ExcelsheetComponent implements OnInit {


  //constructor
  constructor() { }

  //initial declarations
  target!: DataTransfer;
  reader!:FileReader;
  binaryString!:string;
  workBook!: XLSX.WorkBook;
  workSheetName!:string;
  workSheet!:XLSX.WorkSheet;
  data!:Array<[][]>;
  image:Array<any>=[];

  //ngoninit
  ngOnInit(): void {
  }

  //logic for storing the excel data on uploading the file
  onFileChange(event:any)
  {
    this.target=<DataTransfer>(event.target);

    this.reader=new FileReader();

    //reader onload function
    this.reader.onload=(fileData:any)=>{

      this.binaryString=fileData.target.result;
      
      this.workBook=XLSX.read(this.binaryString,{type:'binary'});
      this.workSheetName=this.workBook.SheetNames[0];

      this.workSheet=this.workBook.Sheets[this.workSheetName];

      this.data=(XLSX.utils.sheet_to_json(this.workSheet, {header:1}));
      for(let i=0;i<this.data.length;i++)
      {
        for(let j=(this.data[i].length)-1;j<this.data[i].length;j++)
        {
          if(i!=0)
          this.image.push(this.data[i][j]);
        }
      }
      console.log(this.image)

    }

    //reading the file as binary string
    this.reader.readAsBinaryString((this.target.files[0]));

  }

}
