import React, { useEffect, useState } from 'react';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { collection, query, onSnapshot, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Student } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { format } from 'date-fns';
import { Check, X, Clock, CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

export function AttendanceSystem() {
    const [students, setStudents] = useState<Student[]>([]);
    const [attendance, setAttendance] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const today = format(new Date(), 'yyyy-MM-dd');

    useEffect(() => {
        const unsubStudents = onSnapshot(collection(db, 'students'), (snap) => {
            setStudents(snap.docs.map(d => ({ id: d.id, ...d.data() } as Student)));
            setLoading(false);
        });

        const qAttendance = query(collection(db, 'attendance')); // Simplified for demo
        const unsubAttend = onSnapshot(qAttendance, (snap) => {
            const records: Record<string, string> = {};
            snap.docs.forEach(d => {
                const data = d.data();
                if (data.date === today) {
                    records[data.studentId] = data.status;
                }
            });
            setAttendance(records);
        });

        return () => {
            unsubStudents();
            unsubAttend();
        };
    }, []);

    const markAttendance = async (studentId: string, status: string) => {
        try {
            const recordId = `${studentId}_${today}`;
            await setDoc(doc(db, 'attendance', recordId), {
                studentId,
                status,
                date: today,
                recordedAt: serverTimestamp()
            });
            toast.success(`Marked ${status}`);
        } catch (error) {
            handleFirestoreError(error, OperationType.WRITE, 'attendance');
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Daily Attendance</h2>
                    <p className="text-sm text-neutral-500 flex items-center gap-2">
                        <CalendarIcon className="w-3 h-3" />
                        Today: {format(new Date(), 'MMMM dd, yyyy')}
                    </p>
                </div>
            </div>

            <Card className="border-neutral-200">
                <Table>
                    <TableHeader className="bg-neutral-50/50">
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={4} className="text-center py-8">Loading students...</TableCell></TableRow>
                        ) : students.map(student => (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell><Badge variant="outline">{student.grade}</Badge></TableCell>
                                <TableCell>
                                    {attendance[student.id] ? (
                                        <Badge className={
                                            attendance[student.id] === 'present' ? 'bg-green-100 text-green-700' :
                                            attendance[student.id] === 'absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                        }>
                                            {attendance[student.id].toUpperCase()}
                                        </Badge>
                                    ) : (
                                        <span className="text-xs text-neutral-400 italic">Not marked</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className={`h-8 w-8 ${attendance[student.id] === 'present' ? 'bg-green-100' : ''}`}
                                            onClick={() => markAttendance(student.id, 'present')}
                                        >
                                            <Check className="w-4 h-4 text-green-600" />
                                        </Button>
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className={`h-8 w-8 ${attendance[student.id] === 'absent' ? 'bg-red-100' : ''}`}
                                            onClick={() => markAttendance(student.id, 'absent')}
                                        >
                                            <X className="w-4 h-4 text-red-600" />
                                        </Button>
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className={`h-8 w-8 ${attendance[student.id] === 'late' ? 'bg-yellow-100' : ''}`}
                                            onClick={() => markAttendance(student.id, 'late')}
                                        >
                                            <Clock className="w-4 h-4 text-yellow-600" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
