export interface Measurement {
  [x: string]: number | string;
  at: number;
  metric: string;
  value: number;
  unit: string;
}

export interface MultipleMeasurements {
  metric: string;
  measurements: Measurement[];
}

export interface NewMeasurement {
  newMeasurement: Measurement;
}
