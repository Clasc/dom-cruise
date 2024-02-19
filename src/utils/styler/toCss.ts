const toCss = (style: Record<string, unknown>) => {
    return Object.keys(style).map(key => `${key}:${style[key]}`).join(";\n")
}

export default toCss;