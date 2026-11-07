Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\Foam Gaming\.gemini\antigravity\brain\a4a4885f-acd5-42d0-830a-91107d4a1e2a\.user_uploaded\media_1793609871260_1800fb40.png"
$img = [System.Drawing.Image]::FromFile($filePath)

# In the full image, the modal is in the top-left-center: x around 120-220, y around 80-160
# Let's crop x: 120, y: 70, width: 100, height: 100
$cropX = 130
$cropY = 70
$cropWidth = 100
$cropHeight = 90

$rect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropWidth, $cropHeight
$bmp = New-Object System.Drawing.Bitmap ($cropWidth * 4), ($cropHeight * 4)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
$g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, ($cropWidth * 4), ($cropHeight * 4)), $rect, [System.Drawing.GraphicsUnit]::Pixel)

$destPath = "C:\Users\Foam Gaming\.gemini\antigravity\brain\a4a4885f-acd5-42d0-830a-91107d4a1e2a\.user_uploaded\crop_modal_zoomed.png"
$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$img.Dispose()
Write-Output "Zoomed crop saved to $destPath"

