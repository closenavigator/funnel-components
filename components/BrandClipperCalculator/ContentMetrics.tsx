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
  const monthlyVideos = inputs.videosPerDay * 30
  const monthlyViews = monthlyVideos * inputs.averageViews

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="videosPerDay">Videos Per Day</Label>
        <Input
          id="videosPerDay"
          type="number"
          value={inputs.videosPerDay}
          onChange={(e) => onChange('videosPerDay', Number(e.target.value))}
          min={CLIPPER_PARAMS.minVideosPerDay}
          max={CLIPPER_PARAMS.maxVideosPerDay}
        />
        <Slider
          value={[inputs.videosPerDay]}
          min={CLIPPER_PARAMS.minVideosPerDay}
          max={CLIPPER_PARAMS.maxVideosPerDay}
          step={1}
          onValueChange={(value) => onChange('videosPerDay', value[0])}
        />
        <p className="text-sm text-muted-foreground text-center">
          {monthlyVideos} videos per month
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="averageViews">Average Views per Video</Label>
        <Input
          id="averageViews"
          type="number"
          value={inputs.averageViews}
          onChange={(e) => onChange('averageViews', Number(e.target.value))}
          min={CLIPPER_PARAMS.minViewsPerVideo}
          max={CLIPPER_PARAMS.maxViewsPerVideo}
        />
        <Slider
          value={[inputs.averageViews]}
          min={CLIPPER_PARAMS.minViewsPerVideo}
          max={CLIPPER_PARAMS.maxViewsPerVideo}
          step={100}
          onValueChange={(value) => onChange('averageViews', value[0])}
        />
        <p className="text-sm text-muted-foreground text-center">
          {formatNumber(monthlyViews)} total views per month
        </p>
      </div>
    </div>
  )
} 