import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ClipperInputs, CLIPPER_PARAMS } from "@/types/brandClipper"
import { formatNumber } from "@/lib/format"

interface ContentMetricsProps {
  inputs: ClipperInputs
  onChange: (field: keyof ClipperInputs, value: number) => void
}

export function ContentMetrics({ inputs, onChange }: ContentMetricsProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="videosPerDay">Videos por día</Label>
        <Input
          id="videosPerDay"
          type="number"
          value={inputs.videosPerDay}
          onChange={(e) => onChange('videosPerDay', Math.max(
            CLIPPER_PARAMS.minVideosPerDay,
            Math.min(CLIPPER_PARAMS.maxVideosPerDay, Number(e.target.value))
          ))}
          className="text-center text-lg"
        />
        <Slider
          value={[inputs.videosPerDay]}
          min={CLIPPER_PARAMS.minVideosPerDay}
          max={CLIPPER_PARAMS.maxVideosPerDay}
          step={1}
          onValueChange={(value) => onChange('videosPerDay', value[0])}
        />
        <p className="text-sm text-muted-foreground text-center">
          {inputs.videosPerDay} videos diarios
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="averageViews">Vistas promedio por video</Label>
        <Input
          id="averageViews"
          type="number"
          value={inputs.averageViews}
          onChange={(e) => onChange('averageViews', Math.max(
            CLIPPER_PARAMS.minViewsPerVideo,
            Math.min(CLIPPER_PARAMS.maxViewsPerVideo, Number(e.target.value))
          ))}
          className="text-center text-lg"
        />
        <Slider
          value={[inputs.averageViews]}
          min={CLIPPER_PARAMS.minViewsPerVideo}
          max={CLIPPER_PARAMS.maxViewsPerVideo}
          step={100}
          onValueChange={(value) => onChange('averageViews', value[0])}
        />
        <p className="text-sm text-muted-foreground text-center">
          {formatNumber(inputs.averageViews)} vistas por video
        </p>
      </div>
    </div>
  )
} 