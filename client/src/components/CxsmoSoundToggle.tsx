import { Volume2, VolumeX } from "lucide-react";
import { useCxsmoSound } from "@/contexts/CxsmoSoundContext";

export function CxsmoSoundToggle() {
  const { enabled, toggle } = useCxsmoSound();
  return <button data-cxsmo-sound-silent className="cxsmo-sound-toggle" type="button" aria-label={`${enabled ? "Mute" : "Enable"} optional interface sound`} aria-pressed={enabled} onClick={toggle}>{enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}<b>{enabled ? "Sound on" : "Sound off"}</b></button>;
}
