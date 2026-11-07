Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\Foam Gaming\.gemini\antigravity\brain\a4a4885f-acd5-42d0-830a-91107d4a1e2a\.user_uploaded\media_1793609871260_1800fb40.png"
$img = [System.Drawing.Image]::FromFile($filePath)
Write-Output "Dimensions: $($img.Width) x $($img.Height)"

# Crop the center where the popup dialog is
# In a 1920x1080 screenshot, the modal dialog is centered, around x: 700 to 1250, y: 150 to 800
$cropWidth = [int]($img.Width * 0.4)
$cropHeight = [int]($img.Height * 0.7)
$cropX = [int](($img.Width - $cropWidth) / 2)
$cropY = [int](($img.Height - $cropHeight) / 2)

$rect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropWidth, $cropHeight
$bmp = New-Object System.Drawing.Bitmap $cropWidth, $cropHeight
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $cropWidth, $cropHeight), $rect, [System.Drawing.GraphicsUnit]::Pixel)

$destPath = "C:\Users\Foam Gaming\.gemini\antigravity\brain\a4a4885f-acd5-42d0-830a-91107d4a1e2a\.user_uploaded\crop_modal.png"
$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$img.Dispose()
Write-Output "Cropped image saved to: $destPath"

