param([string]$text)

Add-Type -AssemblyName System.Windows.Forms

# Replace characters that have special meaning in SendKeys
$escapedText = $text -replace '\{', '{{}' `
                     -replace '\}', '{}}' `
                     -replace '\[', '{[}' `
                     -replace '\]', '{]}' `
                     -replace '\(', '{(}' `
                     -replace '\)', '{)}' `
                     -replace '\+', '{+}' `
                     -replace '\^', '{^}' `
                     -replace '\%', '{%}' `
                     -replace '\~', '{~}'

# Small delay to ensure focus (optional, but n8n runs in background)
# If you want it to type into the currently active window:
[System.Windows.Forms.SendKeys]::SendWait($escapedText)
# Add a newline at the end
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
