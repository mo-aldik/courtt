// @ts-nocheck
import { Dialog, Table } from '@chakra-ui/react';

interface CaseDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CaseDetailsDialog = ({ isOpen, setIsOpen }: CaseDetailsDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e: any) => setIsOpen(e?.open)} size={'xl'}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content color='black' dir='rtl'>
          <Dialog.CloseTrigger position='absolute' top='2' insetEnd='2' />

          <Dialog.Header>
            <Dialog.Title>{'تفاصيل'}</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Table.Root size='sm' variant='outline' striped>
              <Table.Header bg='gray.50'>
                <Table.Row>
                  <Table.ColumnHeader textAlign='right'>رقم الطلب/القضية</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign='right'>نوع القضية</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign='right'>قيمة المطالبة</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign='right'>الحالة</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {/* البيانات العشرة */}
                <Table.Row>
                  <Table.Cell>50 / 2026</Table.Cell>
                  <Table.Cell>تنفيذ رسوم تجاري</Table.Cell>
                  <Table.Cell>3,427.00</Table.Cell>
                  <Table.Cell>مسجلة</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>1 / 2025</Table.Cell>
                  <Table.Cell>منازعة موضوعية</Table.Cell>
                  <Table.Cell>16,118.00</Table.Cell>
                  <Table.Cell>مفصولة</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>788 / 2025</Table.Cell>
                  <Table.Cell>تنفيذ عمالي</Table.Cell>
                  <Table.Cell>137,109.00</Table.Cell>
                  <Table.Cell>قيد التنفيذ</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>102 / 2026</Table.Cell>
                  <Table.Cell>إخلاء عقار</Table.Cell>
                  <Table.Cell>45,000.00</Table.Cell>
                  <Table.Cell>جلسة قادمة</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>344 / 2025</Table.Cell>
                  <Table.Cell>مدني كلي</Table.Cell>
                  <Table.Cell>250,000.00</Table.Cell>
                  <Table.Cell>محجوزة للحكم</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>89 / 2026</Table.Cell>
                  <Table.Cell>أمر أداء</Table.Cell>
                  <Table.Cell>12,500.00</Table.Cell>
                  <Table.Cell>مرفوضة</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>512 / 2025</Table.Cell>
                  <Table.Cell>تجاري جزئي</Table.Cell>
                  <Table.Cell>88,400.00</Table.Cell>
                  <Table.Cell>قيد التحقيق</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>15 / 2026</Table.Cell>
                  <Table.Cell>تنفيذ شيكات</Table.Cell>
                  <Table.Cell>5,000.00</Table.Cell>
                  <Table.Cell>مسجلة</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>223 / 2025</Table.Cell>
                  <Table.Cell>تظلم من قرار</Table.Cell>
                  <Table.Cell>0.00</Table.Cell>
                  <Table.Cell>مقبولة</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>667 / 2025</Table.Cell>
                  <Table.Cell>إثبات حالة</Table.Cell>
                  <Table.Cell>2,100.00</Table.Cell>
                  <Table.Cell>منتهية</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default CaseDetailsDialog;
