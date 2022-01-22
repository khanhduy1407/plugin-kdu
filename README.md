# @nkduy/plugin-kdu

Note: requires `@kdu/compiler-sfc` as peer dependency. This is largely a port of `rollup-plugin-kdu` with some vite-specific tweaks.

```js
// vite.config.js
import kdu from '@nkduy/plugin-kdu'

export default {
  plugins: [kdu()]
}
```

## Options

```ts
export interface Options {
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]

  ssr?: boolean
  isProduction?: boolean

  // options to pass on to @nkduy/compiler-sfc
  script?: Partial<SFCScriptCompileOptions>
  template?: Partial<SFCTemplateCompileOptions>
  style?: Partial<SFCStyleCompileOptions>
}
```

## Example for passing options to `@nkduy/compiler-dom`:

```ts
import kdu from '@nkduy/plugin-kdu'

export default {
  plugins: [
    kdu({
      template: {
        compilerOptions: {
          // ...
        }
      }
    })
  ]
}
```

## Example for transforming custom blocks

```ts
import kdu from '@nkduy/plugin-kdu'

const kduI18nPlugin = {
  name: 'kdu-i18n',
  transform(code, id) {
    if (!/kdu&type=i18n/.test(id)) {
      return
    }
    if (/\.ya?ml$/.test(id)) {
      code = JSON.stringify(require('js-yaml').safeLoad(code.trim()))
    }
    return `export default Comp => {
      Comp.i18n = ${code}
    }`
  }
}

export default {
  plugins: [kdu(), kduI18nPlugin]
}
```

## License

MIT
