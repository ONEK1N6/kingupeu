import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { Tipo } from '../../models/tipo';
import { TipoService } from '../../service/tipo.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tipo',
  standalone: true,
  imports: [
    HomeComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
  ],
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.css',
})
export class TipoComponent {
  tipos: Tipo[] = [];
  titulo: string = '';
  opc: string = '';
  tipo = new Tipo();
  op = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;

  constructor(
    private tipoService: TipoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarTipos();
  }

  listarTipos() {
    this.tipoService.getTipos().subscribe((data) => {
      this.tipos = data;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Tipo';
    this.opc = 'Save';
    this.op = 0;
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Tipo';
    this.opc = 'Editar';
    this.tipoService.getTipoById(id).subscribe((data) => {
      this.tipo = data;
      this.op = 1;
    });
    this.visible = true;
  }

  confirmDeleteTipo(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este tipo?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTipo(id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Has cancelado la operación',
        });
      },
    });
  }

  deleteTipo(id: number) {
    this.tipoService.deleteTipo(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'El tipo ha sido eliminado exitosamente',
        });
        this.listarTipos();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el tipo',
        });
      },
    });
  }

  addTipo(): void {
    this.tipoService.createTipo(this.tipo).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Tipo Registrado',
        });
        this.listarTipos();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el tipo',
        });
      },
    });
    this.visible = false;
  }

  confirmSaveTipo() {
    this.confirmationService.confirm({
      message:
        this.op === 0
          ? '¿Estás seguro de que deseas agregar este tipo?'
          : '¿Estás seguro de que deseas editar este tipo?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.opcion();
      },
    });
  }

  editTipo() {
    this.tipoService.updateTipo(this.tipo, this.tipo.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Tipo Editado',
        });
        this.listarTipos();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar el tipo',
        });
      },
    });
    this.visible = false;
  }

  opcion(): void {
    if (this.op == 0) {
      this.addTipo();
      this.limpiar();
    } else if (this.op == 1) {
      this.editTipo();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.tipo.id = 0;
    this.tipo.nombre = '';
  }
}
