#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

vec3 palette( float t ) 
{
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.7059, 0.2314, 0.6039);
    vec3 c = vec3(0.0941, 0.0745, 0.2784);
    vec3 d = vec3(0.1686, 0.4549, 0.7216);

    return a + b*cos( 6.28318*(c*t+d) );
}

void main()
{
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution.xy) / u_resolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.);

    for (float i = 0.; i < 4.; i++)
    {
        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i*0.4 + u_time*0.4);

    d = sin(d*25. + u_time / 2.)/8.;
    d = abs(d);

    d = pow(0.01 / d, 1.2);

    finalColor += col * d;

    }

    gl_FragColor = vec4(finalColor, 1.0);
}
