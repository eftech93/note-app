import * as os from 'node:os';

export const getUsageData = (): any => {
    const cpus: os.CpuInfo[] = os.cpus();
    const data: any = {};
    for (let i = 0, len = cpus.length; i < len; i++) {
        let cpu = cpus[i];
        const total = Object.keys(cpu.times).map((key) => cpu.times[key as keyof typeof cpu.times]).reduce((acc, cur) => acc + cur, 0);
        data[`cpu_${i}`] = {}

        for (const _type in cpu.times) {

            data[`cpu_${i}`][_type] = `${Math.round(100 * cpu.times[(_type as keyof typeof cpu.times)] / total)}%`;
        }

    }
    const used = process.memoryUsage();
    for (let key in used) {
        data[key] = `${Math.round(used[(key as keyof typeof used)] / 1024 / 1024)} MB`;
    }
    return data;
}

export const hashCode =(key: string): number =>{
    let hash = 0;
    for (let i = 0, len = key.length; i < len; i++) {
        let chr = key.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}