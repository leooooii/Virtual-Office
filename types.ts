export interface PDConfig {
  kp: number;
  kd: number;
}

export interface LightState {
  target: number; // 0 for off, 1 for on
  intensity: number;
  velocity: number;
}
