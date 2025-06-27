
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "../../data/orders";
import { RefundRequest } from "../../types/order";

interface RefundRequestsProps {
  refunds: RefundRequest[];
}

const RefundRequests = ({ refunds }: RefundRequestsProps) => {
  if (refunds.length === 0) return null;

  // Generate real-time dates for refund requests
  const generateRefundDates = (refund: RefundRequest) => {
    const now = new Date();
    let requestDate: Date;
    let responseDate: Date | null = null;
    
    if (refund.status === "approved" || refund.status === "rejected") {
      requestDate = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000); // 5 days ago
      responseDate = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    } else {
      requestDate = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    }
    
    return {
      requestDate: requestDate.toISOString(),
      responseDate: responseDate?.toISOString()
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Refund Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {refunds.map((refund) => {
          const dates = generateRefundDates(refund);
          return (
            <div key={refund.id} className="mb-4 last:mb-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Refund #{refund.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Requested on {formatDate(dates.requestDate)} • €{refund.amount.toFixed(2)}
                  </p>
                  {dates.responseDate && (
                    <p className="text-sm text-muted-foreground">
                      Processed on {formatDate(dates.responseDate)}
                    </p>
                  )}
                </div>
                <Badge className={`${
                  refund.status === "approved" ? "bg-green-500" :
                  refund.status === "rejected" ? "bg-red-500" :
                  "bg-yellow-500"
                } text-white`}>
                  {refund.status}
                </Badge>
              </div>
              <p className="text-sm mt-1">Reason: {refund.reason}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RefundRequests;
