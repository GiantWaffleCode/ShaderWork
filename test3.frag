#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.1415926535897932384626433832795

vec3 make_circle(vec2 position, vec3 color, float size) {
    float circle = sqrt(pow(position.x, 2.)+pow(position.y, 2.));
    circle = smoothstep(size, size + 0.017, 1. - circle);

    return color * circle;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution.xy) / u_resolution.y;
    vec2 uv0 = uv;

    //vec3 canvas = vec3(abs(sin(u_time)-.9));
    vec3 canvas = vec3(0.);
    float circle = 0.;

    circle = distance(st, vec2(0.5));

    //vec3 circle2 = make_circle(uv - vec2(0,0), vec3(0.91, 0.03, 0.84), 0.9);

    for (float i = 0.; i < 100.; i++) {

        //float u = vertexId / numVerts;
        //float angle = u * PI * 2.0;
        //float radius = 0.8;
        
        //vec2 pos = vec2(cos(angle), sin(angle)) * radius;
        vec3 col1 = vec3(sin(u_time*.25), sin(u_time*0.75), sin(u_time));
        vec2 pos1 = vec2(sin(u_time+i)*.4, i/5./2.-1.);
        float size1 = .96;

        vec3 col2 = vec3(sin(u_time*.75), sin(u_time*0.25), sin(u_time*.33));
        vec2 pos2 = vec2(sin(u_time+i+3.)*.4, i/5./2.-1.);
        float size2 = .93;

        vec3 col3 = vec3(sin(u_time*.1), sin(u_time*0.8), sin(u_time*.3));
        vec2 pos3 = vec2(cos(u_time*1.2+i+3.)*.8, i/5./2.-5.);
        float size3 = .7;

        vec3 circle2 = make_circle(uv - pos1, col1, size1);
        vec3 circle3 = make_circle(uv - pos2, col2, size2);
        vec3 circle4 = make_circle(uv - pos3, col3, size3);

        canvas += circle2;
        canvas += circle3;
        canvas += circle4;
    }
    

    gl_FragColor = vec4(canvas, 1.0);

}