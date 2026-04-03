'use server';

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { revalidatePath } from 'next/cache';
import { Walk } from '../../../lib/walks';

const filePath = join(process.cwd(), 'data/walks.json');

function readWalks(): Walk[] {
    return JSON.parse(readFileSync(filePath, 'utf-8'));
}

function writeWalks(walks: Walk[]) {
    writeFileSync(filePath, JSON.stringify(walks, null, 2));
}

export async function saveWalk(walk: Walk) {
    const walks = readWalks();
    const index = walks.findIndex(w => w.id === walk.id);
    if (index >= 0) {
        walks[ index ] = walk;
    } else {
        const maxId = walks.reduce((max, w) => Math.max(max, w.id), 0);
        walks.push({ ...walk, id: maxId + 1 });
    }
    writeWalks(walks);
    revalidatePath('/walks');
    revalidatePath('/calendar');
}

export async function deleteWalk(id: number) {
    const walks = readWalks().filter(w => w.id !== id);
    writeWalks(walks);
    revalidatePath('/walks');
    revalidatePath('/calendar');
}