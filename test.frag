#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

mat2 rot(float r)
{
    return mat2(cos(r), sin(r), -sin(r), cos(r));
}

float cube(vec3 p, vec3 s)
{
    p = abs(p) - s;
    return max(max(p.x,p.y),p.z);
}

float crosscube(vec3 p, vec3 s)
{
    vec3 v = vec3(1./3.,1./3.,4./3.);

    float d = cube(p, s*v.xyz);
    float d2 = cube(p, s*v.yzx);
    float d3 = cube(p, s*v.zxy);

    return min(min(d,d2),d3);
}

float menger(vec3 p)
{
    vec3 size = vec3(1.);

    float d = cube(p, size);
    float cd = crosscube(p, size);
    d=max(d,-cd);

    for(int i = 0; i < 9; i++)
    {
        size *= 1./3.;
        float m = size.x*2.;
        p = mod(p-0.5*m,m)-0.5*m;
        cd = crosscube(p, size);
        d = max(d, -cd);
    }

    return d;
}

float map(vec3 p)
{
    p.xz *= rot(u_time/2.);
    p.yz *= rot(u_time/2.);

    float d = menger(p);
    return d;
}

void main() {

    vec2 p = (gl_FragCoord.xy *2. - u_resolution.xy) / min(u_resolution.x,u_resolution.y);

    //vec3 cp = vec3(0.,0.,(1.*(abs(sin(u_time/10.))))+3.);
    vec3 cp = vec3(0.,0.,3.);
    vec3 cd = vec3(0.,0.,-1.);
    vec3 cu = vec3(0.,1.,0.);
    vec3 cs = cross(cd, cu);
    float td = 1.4;

    vec3 ray = normalize(p.x*cs+p.y*cu+cd*td);
    vec3 col = vec3(0.);
    //vec3 col2 = vec3(0.349, 0.6745, 0.1294);

    vec3 col2 = vec3(abs(sin(u_time*0.333))+0.5, abs(sin(u_time*0.15)), abs(cos(u_time*0.25)));
    //col2 *= abs(sin(u_time)*3.)+0.5;

    float me = 0.;

    float d, rl = 0.;
    vec3 rp = cp;
    for(int i = 0; i < 54; i++)
    {
       d = map(rp);
       rl += d;
       rp = cp + rl * ray;
       me += exp(abs(d)*-0.2);
       if(d < 0.001)
       {
        //col = vec3(1.);
        break;
       } 
    }

    col = vec3(1.)*me*0.03*col2;
    
    gl_FragColor = vec4(col, 1.);
}