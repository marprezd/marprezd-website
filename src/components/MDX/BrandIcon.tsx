import { IconBrandCss3, IconBrandHtml5, IconBrandJavascript, IconBrandPython, IconBrandReact, IconBrandTypescript, IconJson, IconTerminal } from '@tabler/icons-react'
import { IconBrandJava } from './Icons'

function BrandIcon({
  brand,
  ...restProps
}: React.ComponentPropsWithoutRef<'svg'> & { brand: string }) {
  let Icon

  switch (brand) {
    case 'py':
      Icon = IconBrandPython
      break
    case 'java':
      Icon = IconBrandJava
    case 'js':
    case 'javascript':
      Icon = IconBrandJavascript
      break
    case 'ts':
    case 'typescript':
      Icon = IconBrandTypescript
      break
    case 'jsx':
    case 'tsx':
      Icon = IconBrandReact
      break
    case 'css':
      Icon = IconBrandCss3
      break
    case 'html':
      Icon = IconBrandHtml5
      break
    case 'json':
    case 'jsonc':
      Icon = IconJson
      break
    case 'sh':
    case 'bash':
      Icon = IconTerminal
      break
    default:
      return null
  }

  return <Icon {...restProps} />
}

export default BrandIcon
