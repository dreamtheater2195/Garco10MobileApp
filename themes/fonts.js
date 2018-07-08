const type = {
    light: 'roboto-light',
    bold: 'roboto-bold',
    medium: 'roboto-medium',
    regular: 'roboto-regular'
}

const size = {
    h1: 96,
    h2: 60,
    h3: 48,
    h4: 34,
    h5: 24,
    h6: 20,
    subTitle1: 16,
    subTitle2: 14,
    body1: 18,
    body2: 14,
    button: 14,
    caption: 12,
    overline: 12
}

const style = {
    h1: {
        fontFamily: type.light,
        fontSize: size.h1
    },
    h2: {
        fontFamily: type.bold,
        fontSize: size.h2
    },
    h3: {
        fontFamily: type.regular,
        fontSize: size.h3
    },
    h4: {
        fontFamily: type.bold,
        fontSize: size.h4
    },
    h5: {
        fontFamily: type.bold,
        fontSize: size.h5
    },
    h6: {
        fontFamily: type.medium,
        fontSize: size.h6
    },
    subTitle1: {
        fontFamily: type.regular,
        fontSize: size.subTitle1
    },
    subTitle2: {
        fontFamily: type.medium,
        fontSize: size.subTitle2
    },
    body1: {
        fontFamily: type.regular,
        fontSize: size.body1
    },
    body2: {
        fontFamily: type.regular,
        fontSize: size.body2
    },
    button: {
        fontFamily: type.medium,
        fontSize: size.button
    },
    caption: {
        fontFamily: type.regular,
        fontSize: size.caption
    },
    overline: {
        fontFamily: type.bold,
        fontSize: size.overline
    }
}

export default {
    type,
    size,
    style
}
