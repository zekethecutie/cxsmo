# C✦SMO Optional Sound Calibration

C✦SMO uses sixteen supplied interface cues as a deliberately optional sensory layer. The calibration raises short interaction and hover cues above the earlier near-ambient level while keeping the louder launch, theme, finish, and replay cues reserved for occasional campaign and directed-player moments.

| Safeguard | Verified behavior |
|---|---|
| Visitor control | Sound is enabled by default only as a preference; it has no autoplay path and may be muted through the site control. |
| Short-cue audibility | Click, navigation, selection, double-click, and hover calibration is raised while high-impact cues remain distinct rather than normalized to a single loud value. |
| Interaction storms | Short cues use an 80ms global cooldown; each hover target has a 900ms cooldown. |
| Device appropriateness | Hover audio ignores touch pointers. Specific controls can use silent attributes where an explicit cue would be inappropriate. |
| Asset coverage | All sixteen registered supplied WAV sources remain mapped to named C✦SMO cues. |

> **Verification boundary:** Source contracts validate registration, calibration values, preference gating, touch exclusion, and cooldown paths. Perceived loudness remains device-, browser-, operating-system-, and visitor-volume-dependent; a human listening pass remains appropriate before a public campaign launch.
