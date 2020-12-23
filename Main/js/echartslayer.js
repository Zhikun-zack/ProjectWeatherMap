export const EchartsLayer = (L.version < '1.0'? L.Class : L.Layer).extend({
    _map : null,
    _ec : null,
    _echartsOptions : null,
    
})