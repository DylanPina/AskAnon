import { Button } from '@/components/ui/button';

export default function ChatLayout() {
    return (
        <div>
            <div className="flex flex-col justify-end bg-white bg-opacity-5">
                <div className="flex justify-between">
                    <div></div>
                    <div className="flex flex-col">
                        <strong>
                            <span className="text-white">Class Name</span>
                        </strong>
                        <span>User Count</span>
                    </div>
                    <Button>Test</Button>
                </div>
            </div>
        </div>
    );
}
