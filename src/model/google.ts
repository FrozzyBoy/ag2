class google {
  public static maps: any;
  public static visualization: any;
  public static charts: any;
}

class coordGoogle {
  lat: number;
  lng: number;
}

interface InfoWindow {
  setPosition(pos: coordGoogle): void;
  setContent(data: string): void;
}