import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { Coche } from '../../models/coche';
import { Marca } from '../../models/marca';
import { Tipo } from '../../models/tipo';
import { CocheService } from '../../service/coche.service';
import { MarcaService } from '../../service/marca.service';
import { TipoService } from '../../service/tipo.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-coche',
  standalone: true,
  imports: [
    HomeComponent,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CocheComponent implements OnInit {
  coches: Coche[] = [];
  marcas: Marca[] = [];
  tipos: Tipo[] = [];
  titulo: string = '';
  opc: string = '';
  coche = new Coche();
  op = 0;
  visible: boolean = false;

  constructor(
    private cocheService: CocheService,
    private marcaService: MarcaService,
    private tipoService: TipoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarCoches();
    this.listarMarcas();
    this.listarTipos();
  }

  listarCoches() {
    this.cocheService.getCoches().subscribe({
      next: (data) => this.coches = data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista de coches' })
    });
  }

  listarMarcas() {
    this.marcaService.getMarcas().subscribe({
      next: (data) => this.marcas = data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista de marcas' })
    });
  }

  listarTipos() {
    this.tipoService.getTipos().subscribe({
      next: (data) => this.tipos = data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar la lista de tipos' })
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Coche';
    this.opc = 'Guardar';
    this.op = 0;
    this.coche = new Coche();
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Coche';
    this.opc = 'Editar';
    this.cocheService.getCocheById(id).subscribe({
      next: (data) => {
        this.coche = data;
        this.op = 1;
        this.visible = true;
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el coche' })
    });
  }

  onSelectMarca(event: any) {
    const marcaId = event.value;
    const marcaSeleccionada = this.marcas.find(marca => marca.id === marcaId);
    if (marcaSeleccionada) {
      this.coche.idMarca = marcaSeleccionada;
    }
  }

  onSelectTipo(event: any) {
    const tipoId = event.value;
    const tipoSeleccionado = this.tipos.find(tipo => tipo.id === tipoId);
    if (tipoSeleccionado) {
      this.coche.idTipo = tipoSeleccionado;
    }
  }

  confirmSaveCoche() {
    this.confirmationService.confirm({
      message: this.op === 0 ? '¿Estás seguro de que deseas agregar este coche?' : '¿Estás seguro de que deseas editar este coche?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.opcion();
      },
    });
  }

  confirmDeleteCoche(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este coche?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cocheService.deleteCoche(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Coche Eliminado',
            });
            this.listarCoches();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el coche',
            });
          },
        });
      },
    });
  }

  opcion(): void {
    if (this.op == 0) {
      this.addCoche();
    } else if (this.op == 1) {
      this.editCoche();
    }
  }

  addCoche(): void {
    this.cocheService.createCoche(this.coche).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Coche Registrado',
        });
        this.listarCoches();
        this.visible = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el coche',
        });
      },
    });
  }

  editCoche() {
    this.cocheService.updateCoche(this.coche, this.coche.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Coche Editado',
        });
        this.listarCoches();
        this.visible = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar el coche',
        });
      },
    });
  }
}