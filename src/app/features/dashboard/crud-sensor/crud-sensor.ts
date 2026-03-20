import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SensorService } from '../../../shared/services/sensor-service';
import { AreaService } from '../../../shared/services/area-service';

@Component({
  selector: 'app-crud-sensor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crud-sensor.html'
})
export class CrudSensorComponent {

  private sensorService = inject(SensorService);
  private areaService = inject(AreaService);

  sensores = signal<any[]>([]);
  areas = signal<any[]>([]);
  showForm = signal(false);

  statusList = ['Ativo', 'Inativo', 'Manutencao'];

  form = new FormGroup({
    serialNumber: new FormControl('', Validators.required),
    fabricante: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    dataInstalacao: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    cicloLeitura: new FormControl<number | null>(null, Validators.required),
    latitude: new FormControl<number | null>(null, Validators.required),
    longitude: new FormControl<number | null>(null, Validators.required),
    areaId: new FormControl('', Validators.required),
  });

  constructor() {
    this.load();
  }

  load() {
    this.sensorService.listar().subscribe({
      next: res => {
        this.sensores.set(res)
      },
      error: err => console.error('Erro listar sensores', err)
    });

    this.areaService.listarAreas().subscribe({
      next: res => this.areas.set(res),
      error: err => console.error('Erro listar áreas', err)
    });

  }

  toggleForm() {
    this.showForm.update(v => !v);
    this.form.reset();
  }

  salvar() {
    if (this.form.invalid) {
      console.log('FORM INVÁLIDO', this.form.value);
      return;
    }

    const payload = {
      serialNumber: this.form.value.serialNumber,
      fabricante: this.form.value.fabricante,
      modelo: this.form.value.modelo,
      dataInstalacao: this.form.value.dataInstalacao,
      tipo: this.form.value.tipo,
      status: this.form.value.status,
      cicloLeitura: Number(this.form.value.cicloLeitura),
      latitude: Number(this.form.value.latitude),
      longitude: Number(this.form.value.longitude),
      areaId: this.form.value.areaId
    };

    console.log('PAYLOAD ENVIADO', payload);

    this.sensorService.cadastrar(payload).subscribe({
      next: () => {
        this.toggleForm();
        this.load();
      },
      error: err => console.error('ERRO AO SALVAR', err)
    });
  }
}
