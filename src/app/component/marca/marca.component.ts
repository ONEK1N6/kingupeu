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
import { Marca } from '../../models/marca';
import { MarcaService } from '../../service/marca.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-marca',
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
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css',
})
export class MarcaComponent {
  marcas: Marca[] = [];
  titulo: string = '';
  opc: string = '';
  marca = new Marca();
  op = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;

  constructor(
    private marcaService: MarcaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarMarcas();
  }

  listarMarcas() {
    this.marcaService.getMarcas().subscribe((data) => {
      this.marcas = data;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Marca';
    this.opc = 'Save';
    this.op = 0;
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Marca';
    this.opc = 'Editar';
    this.marcaService.getMarcaById(id).subscribe((data) => {
      this.marca = data;
      this.op = 1;
    });
    this.visible = true;
  }

  confirmDeleteMarca(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta marca?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteMarca(id);
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

  deleteMarca(id: number) {
    this.marcaService.deleteMarca(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'La marca ha sido eliminada exitosamente',
        });
        this.listarMarcas();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la marca',
        });
      },
    });
  }

  addMarca(): void {
    this.marcaService.createMarca(this.marca).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Marca Registrada',
        });
        this.listarMarcas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar la marca',
        });
      },
    });
    this.visible = false;
  }

  confirmSaveMarca() {
    this.confirmationService.confirm({
      message:
        this.op === 0
          ? '¿Estás seguro de que deseas agregar esta marca?'
          : '¿Estás seguro de que deseas editar esta marca?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.opcion();
      },
    });
  }

  editMarca() {
    this.marcaService.updateMarca(this.marca, this.marca.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Marca Editada',
        });
        this.listarMarcas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar la marca',
        });
      },
    });
    this.visible = false;
  }

  opcion(): void {
    if (this.op == 0) {
      this.addMarca();
      this.limpiar();
    } else if (this.op == 1) {
      this.editMarca();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.marca.id = 0;
    this.marca.nombre = '';
  }
}
