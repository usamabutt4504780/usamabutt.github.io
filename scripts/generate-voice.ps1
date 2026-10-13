$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Speech

$voice = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voice.SelectVoice("Microsoft David Desktop")
$voice.Rate = 0
$voice.Volume = 100

$answers = [ordered]@{
  role = "I’m a Principal Engineer and Enterprise Systems Architect. I lead the architecture and delivery of enterprise platforms, ERP, and workflow applications, from early technical decisions through production."
  projects = "I’ve worked across enterprise platforms, ERP and workflow systems, real-time collaboration products, and a tender-bidding application. My work often brings together architecture, integrations, cloud infrastructure, and hands-on delivery."
  technology = "My toolkit includes Azure and AWS, Node.js, React, Vue, Angular, SQL and NoSQL databases, Camunda, Alfresco, Firebase, Socket.IO, and AI/LLM integrations, alongside PHP and Electron."
  leadership = "I set a clear technical direction, stay close to implementation, and collaborate with product, DevOps, and stakeholders. I also mentor engineers and help teams build dependable delivery practices."
}

$outputDirectories = @(
  (Join-Path $PSScriptRoot "..\voice"),
  (Join-Path $PSScriptRoot "..\nextjs-portfolio\public\voice")
)

try {
  foreach ($directory in $outputDirectories) {
    New-Item -ItemType Directory -Force -Path $directory | Out-Null

    foreach ($answer in $answers.GetEnumerator()) {
      $path = Join-Path $directory "$($answer.Key).wav"
      $voice.SetOutputToWaveFile($path)
      $voice.Speak($answer.Value)
      $voice.SetOutputToNull()
      Write-Output "Generated $path"
    }
  }
}
finally {
  $voice.Dispose()
}
